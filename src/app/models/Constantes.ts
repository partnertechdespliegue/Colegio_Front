const Constantes = {
  "numeroItem":6,
  "tiempoSegundos":1200,
  "msgInactividad":"Sesión cerrada por inactividad",
  "a": "TIPTARD",
  "b": "TIPORANGO",
  "BAD_CREDENTIALES": "Bad credentials",
  "DISABLED": "User is disabled",
  "Msg_BAD_CREDENTIALES": "¡El nombre de usuario o la contraseña son incorrectos!",
  "Msg_DISABLED": "¡El usuario ingresado esta deshabilitado¡",
  "SUCCESS": "¡Listo!",
  "ERROR": "¡Error!",
  "WARNING": "¡Cuidado!",
  "INFO": "¡Mensaje!",
  "ACTUALIZAR": "U",
  "ELIMINAR": "D",
  "REGISTRAR": "R",
  "SOLICITAR": "S",
  "CANCELARSOLICITUD": "C",
  "solicitudRevision": 2,
  "SOLICITUDREVISION": "R",
  "SOLICITUDAPROBADA": "SA",
  "SOLICITUDRECHAZADA": "SR",
  "MOSTRAR": "M",
  "REPORTEWORD": "W",
  "IDPASAPORTE": 3,
  "IDRUC": 2,
  "IDNIVEEDU": 5,
  "IDESTCIV": 1,
  "IDTIPOPAGODEP": 1,
  "SCTRPENSIONEPS": 3,
  "REGSALUDEPS": 4,
  "SCTRSALUDEPS": 1,
  "DIASCOMPTBASE": 30,
  "MAXADELANTO": 30,
  "JUSTIFICADO": [{
    "descripcion": "No Justificado",
    "valor": 0
  }, {
    "descripcion": "Justificado Doc",
    "valor": 1
  }, {
    "descripcion": "Justificado Permiso",
    "valor": 2
  }],
  "tiposComprobantes": [
    { 'idTipoPlanilla': 1, 'descripcion': 'Planilla' },
    { 'idTipoPlanilla': 2, 'descripcion': 'Recibo por Honorarios' }
  ]
  ,
  "SEXO": [{
    "descripcion": "Masculino",
    "abrev": "M"
  }, {
    "descripcion": "Femenino",
    "abrev": "F"
  }],
  "DiasSemana": [{
    "nombre": 'Lunes',
    "seleccionado": false
  }, {
    "nombre": 'Martes',
    "seleccionado": false
  }, {
    "nombre": 'Miercoles',
    "seleccionado": false
  }, {
    "nombre": 'Jueves',
    "seleccionado": false
  }, {
    "nombre": 'Viernes',
    "seleccionado": false
  }, {
    "nombre": 'Sabado',
    "seleccionado": false
  }, {
    "nombre": 'Domingo',
    "seleccionado": false
  }]
  ,
  "TIPOCOMPROBANTE": [{
    'idTipoPlanilla': 1,
    'descripcion': 'Planilla'
  }, {
    'idTipoPlanilla': 2,
    'descripcion': 'Recibo por Honorarios'
  }],

  "CATEGORIAPUESTO": [{
    'idCategoria': "M",
    'descripcion': 'Masivo'
  }, {
    'idCategoria': "E",
    'descripcion': 'Especializado'
  }, {
    'idCategoria': "G",
    'descripcion': 'Gerencial'
  }],

  "ESTADO": [{
    "descripcion": "ACTIVO",
    "valor": true
  },
  {
    "descripcion": "INACTIVO",
    "valor": false
  }],
  "TIPOTARDANZA": [
    {
      "val": "1",
      "descripcion": "Cantidad de días"
    },
    {
      "val": "2",
      "descripcion": "Rango minutos"
    }
  ],
  "TIPORANGO": [
    {
      "val": "1",
      "descripcion": "Minutos exactos"
    },
    {
      "val": "2",
      "descripcion": "Rango completo"
    }
  ],
  "DerechoHab": [
    {
      "idTipoDH": 1,
      "descripcion": "Cónyugue"
    },
    {
      "idTipoDH": 2,
      "descripcion": "Hijo incapacitado completamente"
    },
    {
      "idTipoDH": 3,
      "descripcion": "Madre gestante"
    }
  ],
  "tipoAdeSue": [
    {
      "id": 1,
      "descripcion": "Proporcional"
    },
    {
      "id": 2,
      "descripcion": "Emergencia"
    }

  ],
  "tipoSalon":[
    {
      "id":1,
      "desc":"Unico"
    },
    {
      "id":2,
      "desc":"Compartido"
    }
  ],
  "tipoModena":[
    {
      "id":1,
      "descripcion":"SOLES (S/)"
    },
    {
      "id":2,
      "descripcion":"DOLARES ($)"
    }
  ],
  "sectorEmpresa":[
    {
      "id":1,
      "descripcion":"PUBLICO"
    },
    {
      "id":2,
      "descripcion":"PRIVADO"
    }
  ],
  "tipoCategoria":[
    {
      "id": 4,
      "descripcion": "4ta"
    },
    {
      "id": 5,
      "descripcion": "5ta"
    }
  ],
  "sexo":[
    {
      "abrev": "M",
      "descripcion": "Masculino"
    },
    {
      "abrev": "F",
      "descripcion": "Femenino"
    }
  ],

}
export default Constantes;
