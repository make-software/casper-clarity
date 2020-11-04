import React from 'react';
import { observer } from 'mobx-react';
import { computed, observable } from 'mobx';

interface Props {
  title?: string;
  label?: string;
  toggleStore: ToggleStore;
  size: 'lg' | 'sm' | 'xs';
}

/**
 * State of ToggleButton.
 * There are two ways to use it:
 *   1. use `ToggleStore.isPressed` in JSX so tht when state changed, react will re-render.
 *      @see Explorer.tsx
 *
 *   2. use `mobx.autorun` to observer it, mobx will call the passed function when `ToggleStore.pressed` updated.
 *      @see DagContainer.subscribeToggleStore
 */
export class ToggleStore {
  @observable pressed: boolean = false;

  constructor(pressed: boolean) {
    this.pressed = pressed;
  }

  @computed
  get isPressed() {
    return this.pressed;
  }

  toggle() {
    this.pressed = !this.pressed;
  }
}

export const ToggleButton = observer((props: Props) => (
  <div className="pr-1">
    {props.label && <small>{props.label}</small>}
    <button
      type="button"
      className={`btn btn-${props.size} btn-toggle ${props.toggleStore
        .isPressed && 'active'}`}
      onClick={_ => props.toggleStore.toggle()}
      title={props.title}
    >
      <div className="handle" />
    </button>
  </div>
));
