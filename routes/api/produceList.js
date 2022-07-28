const { Router } = require("express");
const procurementList = require("../../models/procurement.model");
const router = Router();

// todo: get allitems on the  procurement list
router.get("/", async (req, res) => {
  try {
    const procurementitems = await procurementList.find();

    if (!procurementitems) {
      throw new Error("No procurement items found");
    }
    const sortedProcurementitems = procurementitems.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    // res.sendStatus(200).json(sortedProcurementitems);
    res.send(sortedProcurementitems);
  } catch (err) {
    console.log("An error:", err + "occured"); // res.status(500).json({ message: err.message });
  }
});

//todo: add procurement item
router.post("/", async (req, res) => {
  const newProcurementItem = new procurementList(req.body);
  try {
    const procurementitem = await newProcurementItem.save();
    if (!procurementitem) {
      throw new Error("Something went wrong!");
    }
    res.json(procurementitem);
  } catch (error) {
    console.log("An error:", error + "occured");
  }
});

// todo: updating procurement item
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const procurementitem = await procurementList.findByIdAndUpdate(id, req.body);

      if (!procurementitem) {
        throw new Error("item with selected Id doesnot exist!");
      }
      const updatedProcurementitem = { ...procurementitem._doc, ...req.body };
      res.send(updatedProcurementitem);
    }
  } catch (error) {
    console.log("An error:", error + "occured");
  }
});

// todo: delete procurement item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const removedItem = await procurementList.findByIdAndDelete(id);
      if (!removedItem) {
        throw new Error("Item does not exist");
      }
    }
    res.send("Procurement item deleted");
  } catch (error) {
    console.log("An error:", error + "occured");
  }
});

module.exports = router;
