export default interface GitFarmResponse{
    status : String,
    code : Number,
    message : String,
    error? : any,
    data?: Object,
}