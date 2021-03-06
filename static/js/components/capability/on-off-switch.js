/**
 * OnOffSwitchCapability
 *
 * A bubble showing an on/off switch icon.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
'use strict';

const BaseComponent = require('../base-component');
const fluent = require('../../fluent');

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      contain: content;
      text-align: center;
      color: white;
      font-size: 1.6rem;
      cursor: default;
    }

    .webthing-on-off-switch-capability-icon {
      width: 12.4rem;
      height: 12.4rem;
      border-radius: 6.4rem;
      border: 0.2rem solid white;
      background-size: 6.4rem;
      background-repeat: no-repeat;
      transform: translate(0);
      background-color: #89b6d6;
      background-image: url('/images/component-icons/on-off-switch-off.svg');
      background-position: center 2rem;
    }

    .webthing-on-off-switch-capability-icon.on {
      background-color: white;
      background-image: url('/images/component-icons/on-off-switch-on.svg');
    }

    .webthing-on-off-switch-capability-label {
      font-weight: bold;
      text-transform: uppercase;
      padding-top: 8.75rem;
    }

    .webthing-on-off-switch-capability-icon.on
    .webthing-on-off-switch-capability-label {
      color: #5d9bc7;
    }
  </style>
  <div id="icon" class="webthing-on-off-switch-capability-icon">
    <div id="label" class="webthing-on-off-switch-capability-label">--</div>
  </div>
`;

class OnOffSwitchCapability extends BaseComponent {
  constructor() {
    super(template);

    this._icon = this.shadowRoot.querySelector('#icon');
    this._label = this.shadowRoot.querySelector('#label');

    this._on = false;
    this._onClick = this.__onClick.bind(this);
  }

  connectedCallback() {
    this.on = typeof this.dataset.on !== 'undefined' ? this.dataset.on : null;
    this._icon.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this._icon.removeEventListener('click', this._onClick);
  }

  get on() {
    return this._on;
  }

  set on(value) {
    this._on = Boolean(value);

    if (value === true) {
      this._icon.classList.add('on');
      this._label.innerText = fluent.getMessage('on');
    } else if (value === false) {
      this._icon.classList.remove('on');
      this._label.innerText = fluent.getMessage('off');
    } else {
      this._icon.classList.remove('on');
      this._label.innerText = fluent.getMessage('ellipsis');
    }
  }

  __onClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.dispatchEvent(new CustomEvent('click', {
      bubbles: true,
    }));
  }
}

window.customElements.define('webthing-on-off-switch-capability',
                             OnOffSwitchCapability);
module.exports = OnOffSwitchCapability;
