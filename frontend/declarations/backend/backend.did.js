export const idlFactory = ({ IDL }) => {
  const Category = IDL.Record({
    'name' : IDL.Text,
    'items' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
  });
  const ShoppingItem = IDL.Record({
    'id' : IDL.Nat,
    'completed' : IDL.Bool,
    'description' : IDL.Text,
    'emoji' : IDL.Text,
    'category' : IDL.Text,
  });
  return IDL.Service({
    'addItem' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'deleteItem' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'getCategories' : IDL.Func([], [IDL.Vec(Category)], ['query']),
    'getItems' : IDL.Func([], [IDL.Vec(ShoppingItem)], ['query']),
    'updateItem' : IDL.Func([IDL.Nat, IDL.Bool], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
