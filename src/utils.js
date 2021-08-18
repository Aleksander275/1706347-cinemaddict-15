const renderTemplate = (container, element) => {
  container.append(element);
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export { createElement, renderTemplate };
