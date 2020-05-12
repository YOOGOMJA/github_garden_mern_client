export default interface GitFarmResponse{
    status : String,
    code : Number,
    message : String,
    error? : Object,
    data?: Object,
}