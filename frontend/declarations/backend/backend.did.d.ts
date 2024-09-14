import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Category { 'name' : string, 'items' : Array<[string, string]> }
export interface ShoppingItem {
  'id' : bigint,
  'completed' : boolean,
  'description' : string,
  'emoji' : string,
  'category' : string,
}
export interface _SERVICE {
  'addItem' : ActorMethod<[string, string, string], bigint>,
  'deleteItem' : ActorMethod<[bigint], boolean>,
  'getCategories' : ActorMethod<[], Array<Category>>,
  'getItems' : ActorMethod<[], Array<ShoppingItem>>,
  'updateItem' : ActorMethod<[bigint, boolean], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
