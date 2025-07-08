/**
 * Node is used to store values in a LinkedList
 */
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

/**
 * LinkedList class holds a reference to the `head` node.
 */

class LinkedList {
  constructor() {
    this.head = null;
  }
  /**
   * The number of elements in the linked list.
   *
   * @returns {number}
   *   the number of elements in the linked list.
   */

  get length() {
    let node = this.head;
    let count = 0;
    while (node) {
      count ++;
      node = node.next;
    }
    return count;
  }

  /**
   * Find a node in the linked list.
   *
   * @param isMatch
   *  function that returns true if the current node matches the search criteria.
   *
   * @returns {*|null}
   *  the first node where `isMatch(node, index) === true` or null if no match is found.
   */
  find(isMatch) {
    let index = 0;
    let node = this.head;

    while (node) {
      if(isMatch(node, index)) {
        return node;
      }
      index ++;
      node = node.next;
    }
    return null;
  }

  findWithPrevious(isMatch) {
    let index = 0;
    let previous = null;
    let node = this.head;

    while (node) {
      if (isMatch(node, index)) {
        return [node, previous];
      }
      index++;
      previous = node;
      node = node.next;      
    }
    return [null, null];
  }

  /**
   * Insert the value after a matched node in the list.
   *
   * @param isMatch
   *  function that returns true if the current node matches the search criteria.
   *
   * @param value
   *  the value to add.
   *
   * @returns {LinkedList}
   *  this linked list so methods can be chained.
   *
   * @throws 'No match found.'
   *  if list is not empty and no matching element is found.
   */
  insert(value, isMatch = (node, index) => index === this.length - 1) {
    if (this.head) {
      const previous = this.find(isMatch);

      if(!previous) throw new Error("No match found.");

      previous.next = new Node(value, previous.next);
    } else {
      this.insertAtHead(value);
    }
    return this;
  }

  /**
   * Insert a new value at the head of the list.
   * @param value
   *  the new value to insert
   *
   * @returns {LinkedList}
   *  this linked list so methods can be chained.
   */

  insertAtHead(value) {
    // This is a new function that you will need to implement.
    this.head = new Node(value, this.head);
    return this;
  }

  /**
   * Remove the first node where `isMatch(node, index, this) === true`.
   *
   * @param isMatch
   *  function that returns true if the current node matches the node to be removed.
   *
   * @returns {*}
   *  the value of the removed node, where `isMatch(node, index) === true` or null if no match is found.
   */
  remove(isMatch) {
    const match = this.findWithPrevious(isMatch);

    // if it doesn't return a match or if the return value for the "matched node" (element 0) is null, return null
    if(!match || match[0] === null) return null;

    if(match[0] === this.head) {
      this.head = this.head.next;
    } else {
      let previous = match[1];
      let toRemove = match[0];
      previous.next = toRemove.next;
    }
    return match[0].value;
  }
}

module.exports = LinkedList;
