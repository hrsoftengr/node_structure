
const
    mongoose    = require('mongoose'),
    Path        = require('path'),
    Crypt       = require('../../../config/library/helper/crypt').crypt,
    Const       = require(Path.resolve('./config/const/db')),
    {Schema}    = mongoose;

let crypt = new Crypt()


let ticketSchema = new Schema({
        ticketId: {
            type: String,
            trim: true,
            required: [true, 'Ticked ID is required']
        },
        userId: {
            type: Schema.Types.ObjectId,
            trim: true ,
            required: [true, 'user ID is required']
        },
        departmentName: {
            type: String,
            trim: true,
            required: [true, 'departmentName is required']
        },
        issueType:{
            type: String,
            trim: true,
            required: [true, 'issueType is required']
        },
        issueUrl:{
            type: String,
            trim: true,
            required: [true, 'issueUrl is required']
        },
        subject:{
            type: String,
            trim: true,
            required: [true, 'subject is required']

        },
        generalDescription:{
            type: String,
            trim: true,
            required: [true, 'generalDescription is required']

        },
        moduleName:{
            type: String,
            trim: true,
            default: null
        },
        subModuleName:{
            type: String,
            trim: true,
            default: null
        },
        ticketStatus : {
            type : String,
            enum : ['active' , 'inactive'],
            default : 'active'
        }

    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
)


module.exports = mongoose.model(`${Const.TABLE_1}`, ticketSchema);
