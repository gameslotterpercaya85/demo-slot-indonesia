'use babel';

import DemoSlotIndonesiaView from './demo-slot-indonesia-view';
import { CompositeDisposable } from 'atom';

export default {

  demoSlotIndonesiaView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.demoSlotIndonesiaView = new DemoSlotIndonesiaView(state.demoSlotIndonesiaViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.demoSlotIndonesiaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'demo-slot-indonesia:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.demoSlotIndonesiaView.destroy();
  },

  serialize() {
    return {
      demoSlotIndonesiaViewState: this.demoSlotIndonesiaView.serialize()
    };
  },

  toggle() {
    console.log('DemoSlotIndonesia was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
