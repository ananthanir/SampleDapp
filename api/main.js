import express, { json, urlencoded } from 'express';
import cookieParser from "cookie-parser";
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import details from "./artifacts/details.json" assert { type: "json" };
import Cert from "./artifacts/contracts/Certi.sol/Cert.json" assert { type: "json" };
import "dotenv/config";

const server = express();

server.use(express.static("./public"));
server.set("views", "./views");
server.set("view engine", "ejs");

server.use(cookieParser());
server.use(json());
server.use(urlencoded({ extended: false }));

let instance;

// const provider = new JsonRpcProvider(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.API_KEY}`);
// const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
// instance = new Contract(details.contract, Cert.abi, wallet);

const provider = new JsonRpcProvider(`${process.env.LOCAL_RPC}`);
const signer = await provider.getSigner(details.deployer);
const contract = details.contract;
const abi = Cert.abi;

instance = new Contract(contract, abi, signer);


server.get('/', (req, res) => {
    res.send("hello")
})

server.get('/ui', (req, res) => {
    res.render("index", { title: "Certificate DApp" })
})

server.post("/issue", async function (req, res) {
    let body = req.body;
    console.log(body);

    try {
        const trx = await instance.issue(
            body.id,
            body.name,
            body.course,
            body.grade,
            body.date,
        );
        res.status(201).json(trx);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

server.get("/fetch", async function (req, res) {
    let query = req.query;
    console.log(query);

    try {
        const result = await instance.Certificates(query.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

server.get("/abi", async function (req, res) {
    try {
        res.status(200).json({ contract, abi });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

server.listen(process.env.PORT, () => {
    console.log(`Server started at - http://127.0.0.1:${process.env.PORT}`);
})