<template>
  <v-dialog v-model="internalDialogDelete" max-width="500px">
  <v-card>
    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="closeDialog">Cancel</v-btn>
      <v-btn color="blue-darken-1" variant="text" @click="saveDialog">OK</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: {
    dialogDelete: {
      type: Boolean,
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
    internalDialogDelete: false,
  }),


  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.internalDialogDelete = this.dialogDelete;
    },

    saveDialog() {
      this.$emit('save');
    },

    closeDialog() {
      this.$emit('close');
    }

  },
}
</script>