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

  "tipoPago": [
    {
      "id": 1,
      "descripcion": "DEPOSITO CUENTA"
    },
    {
      "id": 2,
      "descripcion": "EFECTIVO"
    },
    {
      "id": 3,
      "descripcion": "OTRO"
    }
  ],

  "tipoCuenta": [
    {
      "id": 1,
      "descripcion": "AHORRO"
    },
    {
      "id": 2,
      "descripcion": "CORRIENTE"
    },
    {
      "id": 3,
      "descripcion": "INTERBANCARIA"
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
  "horas":[
    {
      "id":0
    },
    {
      "id":1
    },
    {
      "id":2
    },
    {
      "id":3
    },
    {
      "id":4
    },
    {
      "id":5
    },
    {
      "id":6
    },
    {
      "id":7
    },
    {
      "id":8
    },
    {
      "id":9
    },
    {
      "id":10
    },
    {
      "id":11
    },
    {
      "id":12
    },
    {
      "id":13
    },
    {
      "id":14
    },
    {
      "id":15
    },
    {
      "id":16
    },
    {
      "id":17
    },
    {
      "id":18
    },
    {
      "id":19
    },
    {
      "id":20
    },
    {
      "id":21
    },
    {
      "id":22
    },
    {
      "id":23
    },
    {
      "id":24
    }
  ],

  "minutos":[
    {
      "id":0,
      "dscrp":0
    },
    {
      "id":5,
      "dscrp":5
    },
    {
      "id":10,
      "dscrp":10
    },
    {
      "id":15,
      "dscrp":15
    },
    {
      "id":20,
      "dscrp":20
    },
    {
      "id":25,
      "dscrp":25
    },
    {
      "id":30,
      "dscrp":30
    },
    {
      "id":35,
      "dscrp":35
    },
    {
      "id":40,
      "dscrp":40
    },
    {
      "id":45,
      "dscrp":45
    },
    {
      "id":50,
      "dscrp":50
    },
    {
      "id":55,
      "dscrp":55
    }
  ]

}
export default Constantes;
