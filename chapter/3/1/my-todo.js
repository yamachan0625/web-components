const template = document.createElement('template');
template.innerHTML = `
<style>
    section {
        background: #fff;
        margin: 30px 0 40px 0;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
    }
    #list-container {
        margin: 0;
        padding: 0;
        list-style: none;
        border-top: 1px solid #e6e6e6;
    }
</style>
<section>
    <todo-input></todo-input>
    <ul id="list-container"></ul>
</section>
`;

class MyTodoElement extends HTMLElement {
  constructor() {
    super();
    console.log('MyTodoElement');

    this._root = this.attachShadow({ mode: 'open' });
    this._list = [
      { text: 'my todo 1', checked: true },
      { text: 'my todo 2', checked: false },
    ];
  }

  connectedCallback() {
    this._root.appendChild(template.content.cloneNode(true));
    this.$input = this._root.querySelector('todo-input');
    this.$listContainer = this._root.querySelector('#list-container');
    this.$input.addEventListener('onSubmit', this.addItem.bind(this));
    this._render();
  }

  _render() {
    if (!this.$listContainer) return;
    this.$listContainer.innerHTML = '';
    this._list.forEach((item, index) => {
      let $item = document.createElement('todo-item');
      $item.index = index;
      $item.checked = item.checked;
      $item.setAttribute('text', item.text);
      $item.addEventListener('onToggle', this.toggleItem.bind(this));
      $item.addEventListener('onRemove', this.removeItem.bind(this));
      this.$listContainer.appendChild($item);
    });
  }

  addItem(e) {
    this._list.push({ text: e.detail });
    this._render();
  }

  removeItem(e) {
    this._list.splice(e.detail, 1);
    this._render();
  }

  toggleItem(e) {
    const item = this._list[e.detail];
    this._list[e.detail] = Object.assign({}, item, {
      checked: !item.checked,
    });
    this._render();
  }
}

window.customElements.define('my-todo', MyTodoElement);
