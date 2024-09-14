import Bool "mo:base/Bool";
import Func "mo:base/Func";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor {
  // Define the ShoppingItem type
  public type ShoppingItem = {
    id: Nat;
    description: Text;
    completed: Bool;
  };

  // Initialize a stable variable to store shopping items
  stable var shoppingItems : [ShoppingItem] = [];
  stable var nextId : Nat = 0;

  // Function to add a new shopping item
  public func addItem(description : Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let newItem : ShoppingItem = {
      id = id;
      description = description;
      completed = false;
    };
    shoppingItems := Array.append(shoppingItems, [newItem]);
    id
  };

  // Function to get all shopping items
  public query func getItems() : async [ShoppingItem] {
    shoppingItems
  };

  // Function to update an item's completed status
  public func updateItem(id : Nat, completed : Bool) : async Bool {
    shoppingItems := Array.map(shoppingItems, func (item : ShoppingItem) : ShoppingItem {
      if (item.id == id) {
        return {
          id = item.id;
          description = item.description;
          completed = completed;
        };
      };
      item
    });
    true
  };

  // Function to delete an item
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