<template>
  <v-dialog v-model="internalDialog" max-width="500px" class="mt-5">
    <!--  Add customer button -->
    <template v-slot:activator="{ props }">
      <v-btn class="ml-4 mb-4 add-button" v-bind="props">{{ text.customers.addCustomer }}</v-btn>
    </template>
    <v-card>
      <!-- Title -->
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <!-- Form -->
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="form.id"  readonly :label="text.customers.form.id"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="form.siren" :error-messages="sirenErrors" :label="text.customers.form.siren"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="form.siret" :error-messages="siretErrors" :label="text.customers.form.siret"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="form.legalName" :error-messages="legalNameErrors" :label="text.customers.form.legalName"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- Actions  -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeDialog">{{ text.buttons.cancel }}</v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="saveDialog">{{ text.buttons.submit }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import text from '@/locales/texte.js';

export default {
  props: {
    form: {
      type: Object,
      required: false
    },
    dialog: {
      type: Boolean,
      required: false
    },
    editedIndex: {
      type: Number,
      required: false
    },
    save: {
      type: Function,
      required: false
    },
    close: {
      type: Function,
      required: false
    },
  },

  data: () => ({
    text: text,
    internalDialog: false,
    formValid: false,
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? text.customers.addCustomer : text.customers.editCustomer
    },
    // Handle the cases
    sirenErrors() {
      const errors = [];
      if (!this.form.siren) errors.push(text.customers.validation.siren.required);
      if (this.form.siren && this.form.siren.length !== 9) errors.push(text.customers.validation.siren.max);
      if (this.form.siren && !/^\d+$/.test(this.form.siren)) errors.push(text.customers.validation.siren.num);
      return errors;
    },
    siretErrors() {
      const errors = [];
      if (!this.form.siret) errors.push(text.customers.validation.siret.required);
      if (this.form.siret && this.form.siret.length !== 14) errors.push(text.customers.validation.siret.max);
      if (this.form.siret && !/^\d+$/.test(this.form.siret)) errors.push(text.customers.validation.siret.num);
      return errors;
    },
    legalNameErrors() {
      const errors = [];
      if (!this.form.legalName) errors.push(text.customers.validation.legalName.required);
      return errors;
    },
  },

  created () {
    this.initialize()
  },

  watch: {
    // Watch form changes
    form: {
      deep: true,
      handler() {
        this.updateFormValidity();
      }
    }
  },

  methods: {
    initialize () {
      this.internalDialog = this.dialog;
      this.editedItem = {...this.form};
    },

    // Save Dialog
    saveDialog() {
      if (this.formValid) {
        this.$emit('save');
      }
    },

    // close Dialog
    closeDialog () {
      this.$emit('close');
    },

    // Check if all input fields are valid
    updateFormValidity() {
      this.formValid =
          this.sirenErrors.length === 0 &&
          this.siretErrors.length === 0 &&
          this.legalNameErrors.length === 0;
    }
  },
}
</script>