<script>
export default {
  inheritAttrs: false,

  props: {
    value: {
      type: [
        String,
        Number,
      ],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    valid: {
      type: Boolean,
      default: null,
    },
  },

  data() {
    return {
      focused: false,
    };
  },

  computed: {
    formFieldClass() {
      return {
        'mpc-form-field': true,
        'mpc-form-field_auth': this.isAuth,
        'mpc-form-field_focused': this.focused,
        'mpc-form-field_search': this.$attrs.type === 'search',
        'mpc-form-field_invalid': this.valid === false,
      };
    },

    isTextArea() {
      return this.$attrs.type === 'textarea';
    },

    inputOptions() {
      return {
        on: {
          ...this.$listeners,
          focus: () => {
            this.focused = true;
          },

          blur: () => {
            this.focused = false;
          },

          input: (event) => {
            this.$emit('input', event.target.value);
          },
        },
        class: {
          'mpc-form-field__input': true,
          'mpc-form-field__input_textarea': this.isTextArea,
        },
        props: this.$props,
        attrs: this.$attrs,
        domProps: {
          value: this.value || '',
        },
        directives: [],
        ref: 'input',
      };
    },
  },

  render() {
    return (
      <div class={this.formFieldClass}>
        <label class="mpc-form-field__label-wrapper">
          {this.label ? (
            <div class="mpc-form-field__label">{this.label}</div>
          ) : null}
          {this.$slots.default
            ? this.$slots.default
            : this.$createElement(
              this.isTextArea ? 'textarea' : 'input',
              this.inputOptions,
            )}
        </label>
        {this.$slots.errors
          ? <div class="mpc-form-field__errors">{this.$slots.errors}</div>
          : null}
      </div>
    );
  },
};
</script>

