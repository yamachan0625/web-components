const template = document.createElement('template');
template.innerHTML = `
      <style>
        p {
          color: #f0f;
        }
      </style>
      <p>This is a custom element!</p>
`;

class LifeCycleElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    console.log('construcotr');
  }
  // 要素がドキュメントに挿入されたときに呼び出される
  connectedCallback() {
    console.log('connectedCallback');
  }

  // 要素がドキュメントから削除されたときに呼び出される
  disconnectedCallback() {
    console.log('disconnectedCallback');
  }

  // 観測属性のリストを定義する
  static get observedAttributes() {
    return ['name'];
  }

  // 要素の属性が更新されたときに呼び出される
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`attributeChangedCallback ${name}:${oldValue}=>${newValue}`);
  }

  // 要素が新しい文書に採用されたときに呼び出される
  adoptedCallback(oldDocument, newDocuent) {
    console.log(`adoptedCallback ${oldDocument}=>${newDocuent}`);
  }
}

customElements.define('lifecycle-el', LifeCycleElement);
