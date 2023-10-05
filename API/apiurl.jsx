// export const base = "https://gestioncamapi-production.up.railway.app";
// export const baseURL = "https://gestioncamapi-production.up.railway.app/api/";

// export const base = "http://192.168.1.232:8080";
// export const baseURL = "http://192.168.1.232:8080/api/";

export const base = "http://192.168.1.202:65004";
export const baseURL = "http://192.168.1.202:65004/api/";


 //export const base = "https://api-gestion-camiones-production.up.railway.app";
 //export const baseURL = "https://api-gestion-camiones-production.up.railway.app/api/";
 
 //export const base = "http://161.132.180.242:65004";
 //export const baseURL = "http://161.132.180.242:65004/api"
//Imgagen
export const fondoURL = "../../Styles/fondo5.jpg";

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

//Fallas Imagen
export const FallasImagenURL = `${baseURL}fallas-imagen`;
export const FallasImgxRegistrosURL = `${FallasImagenURL}/xrgs/`
//export const GaleriaImagesURL = `${base}`

//Usuario
export const usuarioURL = `${baseURL}usuarios`;

//Registro General de Salidas
export const RGS_URL = `${baseURL}RGS`;
export const RGS_xEmpresa = `${RGS_URL}/xempresa-sede/` 
export const RGS_Listados = `${RGS_URL}/listados-RGS/`
export const RGS_CPendiente = `${RGS_URL}/gestion-estado/pendiente/`
export const RGS_CReparar = `${RGS_URL}/gestion-estado/reparar/`
export const RGS_CHabilitar = `${RGS_URL}/gestion-estado/habilitar/`

//Observaciones 
export const ObsURL = `${baseURL}Obs`;
export const ObsxRgsURL = `${ObsURL}/xRGS/`

//Registro Cambio de llantas de Salidas
export const CambioLlantasURL = `${baseURL}cambio-llantas`;

//Reparaciones
export const ReparacionesURL = `${baseURL}reparaciones`;
export const ReparacionxRGS = `${ReparacionesURL}/xrgs/`

