export const validateEmail = (email) => {
  const regextSt =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regextSt.test(email);
};

export const validateCreateProduct = (product, images) => {
  let sizes = product.sizes;
  let details = product.details;
  let questions = product.questions;

  const checks = [
    {
      msg: "Name, Description, Brand added successfully.",
      type: "success",
    },
  ];

  // validate images
  if (images.length < 2) {
    checks.push({
      msg: `Choose atleast 2 images (${2 - images.length} remaining).`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `${images.length} images choosen.`,
      type: "success",
    });
  }

  // validate colors
  if (!product.color.color) {
    checks.push({
      msg: `Choose a main product color.`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `Product color been choosen.`,
      type: "success",
    });
  }

  // validate color style image
  if (!product.color.image) {
    checks.push({
      msg: `Choose a product style image.`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `Product style image been choosen.`,
      type: "success",
    });
  }

  // validate multiple sizes qty and price
  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i].qty == "" || sizes[i].price == "" || sizes[i].size == "") {
      checks.push({
        msg: `Please fill all informations on sizes.`,
        type: "error",
      });
      break;
    } else {
      checks.push({
        msg: `Atleast one size/qty/price added.`,
        type: "success",
      });
    }
  }

  // validate multiple details of product
  for (let i = 0; i < details.length; i++) {
    if (details[i].name == "" || details[i].value == "") {
      checks.push({
        msg: `Please fill all informations on details.`,
        type: "error",
      });
      break;
    } else {
      checks.push({
        msg: `Atleast one detail added.`,
        type: "success",
      });
    }
  }

  // validate question
  for (var i = 0; i < questions.length; i++) {
    if (questions[i].question == "" || details[i].answer == "") {
      checks.push({
        msg: `Please fill all informations on questions.`,
        type: "error",
      });
      break;
    } else {
      checks.push({
        msg: `Atleast one question added.`,
        type: "success",
      });
    }
  }

  let isNotValid = checks.find((item) => item.type == "error");
  // if its not valid find the error and toggle showDialog and show the error
  if (isNotValid) {
    return checks;
  } else {
    return "valid"
  }
};