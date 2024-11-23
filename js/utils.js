// js/utils.js

// Example: Utility function for checking if two objects are colliding
export function checkCollision(obj1, obj2) {
    const distance = obj1.position.distanceTo(obj2.position);
    return distance < (obj1.geometry.parameters.width / 2 + obj2.geometry.parameters.width / 2);
}
