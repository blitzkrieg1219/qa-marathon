const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

// Appのポート番号に直す（社員番号じゃ、3000番の人じゃないと通らない）
const port = 411;

const cors = require("cors");
app.use(cors());

const { Pool } = require("pg");
const pool = new Pool({
  // 自身が構築したDB設定に直す
  // hostはlocalhostではなく、DBのコンテナ名にする（DockerNetwork上ではコンテナ名＝ホスト名）
  user: "user_411", // PostgreSQLのユーザー名に置き換えてください
  host: "localhost",
  database: "crm_411", // PostgreSQLのデータベース名に置き換えてください
  password: "pass_411", // PostgreSQLのパスワードに置き換えてください
  port: 5432,
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/customers", async (req, res) => {
  try {
    const customerData = await pool.query("SELECT * FROM customers");
    res.send(customerData.rows);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.get("/customers/:customerId", async (req, res) => {
  try {
    const customerId = parseInt(req.params.customerId);
    const customerData = await pool.query(
      "SELECT * FROM customers WHERE customer_id = $1",
      [customerId]);
    res.send(customerData.rows);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/customers/add", async (req, res) => {
  try {
    const { companyName, industry, contact, location } = req.body;
    const newCustomer = await pool.query(
      "INSERT INTO customers (company_name, industry, contact, location) VALUES ($1, $2, $3, $4) RETURNING *",
      [companyName, industry, contact, location]
    );
    res.json({ success: true, customer: newCustomer.rows[0] });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

app.post("/customers/update/:customerId", async (req, res) => {
  try {
    const customerId = parseInt(req.params.customerId);
    const { companyName, industry, contact, location } = req.body;
    const newCustomer = await pool.query(
      "UPDATE customers SET company_name=$1, industry=$2, contact=$3, location=$4, updated_date=NOW() WHERE customer_id=$5",
      [companyName, industry, contact, location, customerId]
    );
    res.json({ success: true, customer: newCustomer.rows[0] });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

app.post("/customers/delete/:customerId", async (req, res) => {
  try {
    const customerId = parseInt(req.params.customerId);
    const newCustomer = await pool.query(
      "DELETE FROM customers WHERE customer_id=$1",
      [customerId]
    );
    res.json({ success: true, customer: newCustomer.rows[0] });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

app.use(express.static("public"));
