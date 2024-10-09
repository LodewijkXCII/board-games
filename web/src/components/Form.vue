<template>
  <form @submit.prevent="submitForm">
    <fieldset>
      <label>
        Datum
        <input
          type="date"
          name="date"
          aria-label="date"
          v-model="formData.date"
        />
      </label>
      <label>
        Spelers
        <select
          aria-label="Selecteer de spelers..."
          multiple
          v-model="formData.players"
        >
          <option disabled>Selecteer de spelers...</option>
          <option v-for="player in allplayers" :value="player">
            {{ player.name }}
          </option>
        </select>
      </label>
      <label>
        Winnaar:
        <select
          name="favorite-cuisine"
          aria-label="Select your favorite cuisine..."
          required
          :disabled="formData.players.length < 1"
          :aria-invalid="formData.players.length < 1 ? true : false"
          v-model="formData.winner_player_id"
        >
          <option v-for="player in formData.players" :value="player">
            {{ player.name }}
          </option>
        </select>
        <small v-if="formData.players.length < 1"
          >Selecteer eerst de speler</small
        >
      </label>
      <label>
        Punten
        <input
          type="number"
          name="number"
          placeholder="Number"
          aria-label="Number"
          v-model="formData.points"
        />
      </label>
    </fieldset>
    <input type="submit" value="Opslaan" />
    <small v-if="submitMessage">{{ submitMessage }}</small>
  </form>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";

const props = defineProps({ id: String });
const formData = ref({
  date: new Date().toISOString().slice(0, 10),
  players: [],
  winner_player_id: null,
  points: 0,
});
const allplayers = ref([]);
const submitMessage = ref("");

onMounted(() => getAllPlayers());

const getAllPlayers = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/players");

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    allplayers.value = await response.json();

    console.log(allplayers.value);
  } catch (error) {
    console.error(error.message);
  }
};

const submitForm = async () => {
  const submitData = {
    players: [],
    winner_player_id: formData.value.winner_player_id.id,
    points: formData.value.points,
    date: formData.value.date,
  };

  formData.value.players.forEach((player) =>
    submitData.players.push(player.id)
  );

  try {
    console.log(submitData);
    const request = new Request(
      `http://localhost:5000/api/v1/sessions/${props.id}`,
      {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await fetch(request);

    if (response.status == 200) {
      submitMessage.value = "Data is goed ontvangen!";
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
</script>
