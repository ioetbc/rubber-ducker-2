<script lang='ts'>
import { onMount } from "svelte";
    let todos: Array<{ text: string; completed: boolean }> = []

    onMount(() => {
    window.addEventListener('message', event => {
        const message = event.data;
        console.log({message})
        switch (message.type) {
            case 'newTodo':
                todos = [{ text: message.text, completed: false }, ...todos]
                break;


        }
    });
    })
</script>

<style>
    div {
        background: blue;
    }
</style>

<div>{JSON.stringify(todos)}</div>

<button on:click={() => {
    tsvscode.postMessage({
        type: 'onInfo',
        value: 'some info'
    })
}}>click this for info</button>

<button on:click={() => {
    tsvscode.postMessage({
        type: 'onError',
        value: 'there was an error'
    })
}}>click this for error</button>

