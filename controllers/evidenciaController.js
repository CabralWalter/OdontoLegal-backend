const { EvidenciaImagem, EvidenciaTexto } = require('../models/Evidencia');
const Caso = require('../models/Caso');

// Simulação dos "métodos" da evidência
const processarImagem = (url) => {
  console.log(`[🧠 IA] Processando imagem: ${url}`);
  // Aqui entraria OCR, OpenCV, etc.
};

const analiseDeTexto = (conteudo) => {
  console.log(`[🧠 NLP] Analisando texto: ${conteudo.slice(0, 50)}...`);
  // Aqui poderia ser análise de sentimento, padrão, etc.
};

// 📷 Upload de imagem odontológica (radiografia, foto, etc.)
exports.uploadImagem = async (req, res) => {
  try {
    const casoId = req.params.casoId;
    const { userId } = req.body; // Envie o id do usuário no body ou token

    const caso = await Caso.findById(casoId);
    if (!caso) return res.status(404).json({ erro: 'Caso não encontrado' });

    const novaEvidencia = new EvidenciaImagem({
      imagemURL: req.file.path, // caminho salvo no disco
      dataColeta: new Date(),
      coletadoPor: userId,
      caso: casoId
    });

    await novaEvidencia.save();

    // Vincula ao caso
    caso.evidencias.push(novaEvidencia._id);
    await caso.save();

    processarImagem(novaEvidencia.imagemURL);

    res.status(201).json({ msg: 'Imagem enviada com sucesso', evidencia: novaEvidencia });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// 📝 Criação de evidência de texto
exports.criarTexto = async (req, res) => {
  try {
    const casoId = req.params.casoId;
    const { conteudo, userId } = req.body;

    const caso = await Caso.findById(casoId);
    if (!caso) return res.status(404).json({ erro: 'Caso não encontrado' });

    const novaEvidencia = new EvidenciaTexto({
      conteudo,
      dataColeta: new Date(),
      coletadoPor: userId,
      caso: casoId
    });

    await novaEvidencia.save();

    // Vincula ao caso
    caso.evidencias.push(novaEvidencia._id);
    await caso.save();

    analiseDeTexto(novaEvidencia.conteudo);

    res.status(201).json({ msg: 'Texto registrado com sucesso', evidencia: novaEvidencia });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
