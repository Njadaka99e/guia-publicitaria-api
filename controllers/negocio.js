const db = require('../models');

exports.getNegocios = async (req, res, next) => {
  const negocios = await db.Negocio.findAndCountAll();
  res
    .status(200)
    .json({ success: true, count: negocios.count, data: negocios.rows });
};

exports.postNegocio = async (req, res, next) => {
  const [negocio, created] = await db.Negocio.findOrCreate({
    where: { nombre: req.body.nombre },
    defaults: {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      direccion: req.body.direccion,
      // localizacion: req.body.localizacion,
      updatedAt: Date.now()
    }
  });
  res.status(200).json({success: created, data: negocio})
};
