// temolateタグの作成
const template = document.createElement('template');
// ShadowTreeは外部に影響しない閉じ込められたTreeである
template.innerHTML = `
  <style>
    p {
      font-weight:bold;
    }
  </style>
  <p>This is a custom element!</p>
`;

class MinimumElement extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    // cips: document.appendChildとしてしまうとstyleがdocument全体に影響する
    shadowRoot.appendChild(template.content.cloneNode(true)); // ShadowTreeを作成し挿入
  }
}
// 第一引数のnameには少なくとも1つのハイフンが含まれる必要がある;
customElements.define('minimum-el', MinimumElement);
