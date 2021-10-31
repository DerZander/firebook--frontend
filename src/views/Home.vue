<template>
  <div class="">
    <CardComponent
      header="Willkommen auf auf der Seite"
      :centeredHeader="true"
      :centeredContent="true"
    >
      <img alt="Vue logo" src="../assets/logo.png" width="50%" />
      <p>Von Kameraden für Kameraden der Feiwilligen Feuerwehr Bedburg.</p>
      <p>
        Auf dieser Seite können alle Einsätze, Fahrzeuge und
        Getränkeabrechnungen eingesehen werden.
      </p>
      <p>Viel Spaß beim stöbern.</p>
    </CardComponent>
  </div>
</template>

<script>
import CardComponent from "@/components/CardComponent";
export default {
  name: "Home",
  components: { CardComponent },
};
</script>
