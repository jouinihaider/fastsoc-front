<template>
  <v-dialog v-model="internalDialog" max-width="500px" class="mt-5">
    <!--  Add customer button -->
    <template v-slot:activator="{ props }">
      <v-btn class="ml-4 mb-4 add-button" v-bind="props">Add Customer</v-btn>
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
              <v-text-field v-model="form.id"  readonly label="Identifiant"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="form.siren" :error-messages="sirenErrors" label="Siren"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="form.siret" :error-messages="siretErrors" label="Siret"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="form.legalName" :error-messages="legalNameErrors" label="Legal Name"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- Actions  -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="saveDialog">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
    internalDialog: false,
    formValid: false,
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Add Customer' : 'Edit Customer'
    },
    // Handle the cases
    sirenErrors() {
      const errors = [];
      if (!this.form.siren) errors.push('Siren is required');
      if (this.form.siren && this.form.siren.length !== 9) errors.push('Siren must be 9 characters');
      if (this.form.siren && !/^\d+$/.test(this.form.siren)) errors.push('Siren must be numeric');
      return errors;
    },
    siretErrors() {
      const errors = [];
      if (!this.form.siret) errors.push('Siret is required');
      if (this.form.siret && this.form.siret.length !== 14) errors.push('Siret must be 14 characters');
      if (this.form.siret && !/^\d+$/.test(this.form.siret)) errors.push('Siret must be numeric');
      return errors;
    },
    legalNameErrors() {
      const errors = [];
      if (!this.form.legalName) errors.push('Legal Name is required');
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