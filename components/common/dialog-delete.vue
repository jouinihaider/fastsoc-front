<template>
  <v-dialog v-model="internalDialogDelete" max-width="500px">
  <v-card>
    <v-card-title class="text-h5">{{text.deleteDialog.title}}</v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="closeDialog">{{ text.buttons.cancel }}</v-btn>
      <v-btn color="blue-darken-1" variant="text" @click="saveDialog">{{ text.buttons.submit }}</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>


<script>
import text from '@/locales/texte.js';

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
    text: text,
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