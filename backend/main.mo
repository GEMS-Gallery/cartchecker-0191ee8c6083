import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Text "mo:base/Text";

actor {
  public type ShoppingItem = {
    id: Nat;
    description: Text;
    completed: Bool;
    category: Text;
  };

  public type Category = {
    name: Text;
    items: [Text];
  };

  stable var shoppingItems : [ShoppingItem] = [];
  stable var nextId : Nat = 0;

  let categories : [Category] = [
    { name = "Produce"; items = ["Lettuce", "Tomato", "Cucumber", "Carrot", "Spinach"] },
    { name = "Bakery"; items = ["Bread", "Muffins", "Bagels", "Croissants", "Donuts"] }
  ];

  public query func getCategories() : async [Category] {
    categories
  };

  public func addItem(description : Text, category : Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let newItem : ShoppingItem = {
      id = id;
      description = description;
      completed = false;
      category = category;
    };
    shoppingItems := Array.append(shoppingItems, [newItem]);
    id
  };

  public query func getItems() : async [ShoppingItem] {
    shoppingItems
  };

  public func updateItem(id : Nat, completed : Bool) : async Bool {
    shoppingItems := Array.map(shoppingItems, func (item : ShoppingItem) : ShoppingItem {
      if (item.id == id) {
        return {
          id = item.id;
          description = item.description;
          completed = completed;
          category = item.category;
        };
      };
      item
    });
    true
  };

  public func deleteItem(id : Nat) : async Bool {
    let updatedItems = Array.filter(shoppingItems, func (item : ShoppingItem) : Bool {
      item.id != id
    });
    if (shoppingItems.size() != updatedItems.size()) {
      shoppingItems := updatedItems;
      true
    } else {
      false
    };
  };
}