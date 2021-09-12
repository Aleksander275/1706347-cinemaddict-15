import Abstract from '../view/abstract.js';

const renderTemplate = (container, element, position = true) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  if (position) {
    container.append(element);
  } else {
    container.prepend(element);
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

const sortDate = (filmA, filmB) => {
  if (filmA.date > filmB.date) {
    return -1;
  }
  if (filmA.date < filmB.date) {
    return 1;
  }

  return 0;
};

const sortRating = (filmA, filmB) => {
  if (filmA.rating > filmB.rating) {
    return -1;
  }
  if (filmA.rating < filmB.rating) {
    return 1;
  }

  return 0;
};

export { createElement, renderTemplate, remove, replace, sortDate, sortRating };
