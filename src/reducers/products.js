var initialState = [
  {
    id: 1,
    name: "IPHONE",
    price: 400,
    status: true
  },
  {
    id: 2,
    name: "SAMSUNG",
    price: 500,
    status: false
  },
];

const products = (state = initialState, action) => {
  switch(action.type){
    default: return [...state];
  }
}

export default products;