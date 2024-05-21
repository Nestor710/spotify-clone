<script lang="ts">
    const current = new Date()
    const currentHour = current.getHours();

    let greeting = "";
    if (currentHour < 12) {
        greeting = "Good Morning"
    } else if (currentHour < 18) {
        greeting = "Goof afternoon"
    } else {
        greeting = "Good evening"
    }
</script>

<h1 class="text-3xl font-bold">{greeting}</h1>