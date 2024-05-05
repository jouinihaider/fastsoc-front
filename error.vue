<script lang="ts" setup>
const error = useError()
</script>

<template>
  <NuxtLayout>
    <div class="my-3 text-center container-xl" v-if="error.statusCode === 404">
      <h4>Il semblerait que vous vous soyez perdu !</h4>
      <p>Désolé, mais la page que vous recherchez n'existe pas.</p>
      <p>Cliquez sur le bouton suivant pour revenir à la page d'accueil.</p>
    </div>
    <div class="my-3 text-center container-xl" v-else-if="error.statusCode === 403">
      <h4>Accès restreint !</h4>
      <p>Désolé, mais il semblerait que vous n'ayez pas droits de visiter cette page.</p>
      <p>Cliquez sur le bouton suivant pour revenir à la page d'accueil.</p>
    </div>
    <div class="my-3 text-center container-xl" v-else>
      <h4>Oops, une erreur s'est produite!</h4>
      <p>Désolé, nous ne sommes pas en mesure de traiter votre demande.</p>
      <p>Cliquez sur le bouton suivant pour revenir à la page d'accueil.</p>
    </div>
  </NuxtLayout>
</template>
