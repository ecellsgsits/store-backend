import Order from "../models/order.js";
import {auth, googleSheetsInstance, sheet_id} from "../middleware/google.js";

export function getAll(req, res) {
  Order.find({uid: req.query.uid}).then((resp) => res.status(200).json(resp));
}

// name mob email product txn date
export async function addOrder(req, res) {
  const {uid, cart, name, email, contact, transactionID} = req.body;

  if (!!uid && !!cart && !!email && !!cart && !!name && !!contact && !!transactionID) {
    const orderDate = new Date().toLocaleDateString();
    // write to google sheet
    await googleSheetsInstance.spreadsheets.values.append({
      auth,
      spreadsheetId: sheet_id,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[name, contact, email, getProducts(cart), transactionID, orderDate]],
      },
    });

  //   // save to mongodb
    Order.create({
      uid: req.body.uid,
      cart: JSON.stringify(req.body.cart),
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.contact,
      transactionID: req.body.transactionID,
    }).then(() => {
      Order.find().then((resp) => res.status(200).json(resp));
    });
  } else {
    res.status(400).json({err: "invalid input"});
  }
}

function getProducts(cart) {
  let products = "";

  for (const product of cart) {
    products += `${product.name}\nColor: ${product.color}\nVariant: ${product.variant}\nSize: ${product.size}\nQty: ${product.quantity}\n\n`;
  }

  return products.trim();
}