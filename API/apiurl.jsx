 export const base = "http://192.168.1.232:8080";
 export const baseURL = "http://192.168.1.232:8080/api/";
//export const base = "http://192.168.1.35:8080";
//export const baseURL = "http://192.168.1.35:8080/api/";

//Info
export const infoURL = `${baseURL}usuarios/info/`

//Camiones
export const camionesURL = `${baseURL}camiones`;
export const camionesxhabilitados = `${baseURL}camiones/estado/`;
export const camionesxsede = `${baseURL}camiones/xsede/`;
export const camionesxreparacion = `${camionesURL}/xsede-reparacion/`

//CheckList Camion
export const checkListxcamionURL = `${baseURL}checkListCamion/xcamion/`
export const checkListCamionURL = `${baseURL}checkListCamion`; 

//CheckList Carreta
export const checkListCarretaURL = `${baseURL}checkListCarreta`; 

//CheckList Expreso
export const checkListExpresoURL = `${baseURL}cle`;

//Usuario
export const usuarioURL = `${baseURL}usuarios`;

//Registro General de Salidas
export const RGS_URL = `${baseURL}RGS`;
export const RGS_xEmpresa = `${RGS_URL}/xempresa-sede/`

//Registro Cambio de llantas de Salidas
export const CambioLlantasURL = `${baseURL}cambio-llantas`;


