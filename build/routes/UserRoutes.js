"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const UserController_1 = require("../controllers/UserController");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.get('/users', UserController_1.getUsers);
router.get('/users/:id', UserController_1.getUserById);
router.post('/user', UserController_1.createUser);
router.put('/userPicture/:id', upload.single('picture'), UserController_1.updateUserPicture);
router.put('/user/:id', UserController_1.updateUser);
router.delete('/user/:id', UserController_1.deleteUser);
router.post('/login', UserController_1.loginUser);
exports.default = router;
