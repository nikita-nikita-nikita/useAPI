# useAPI
assignment 4

```javascript
const Component = () => {
const [data, error, status, refresh, cancel] = useAPI(api, options);
if (status === 'idle') {
    return (
                <>
                    {data?.name ? <div className="hello_message">Hi, {data.name}!</div> : null}
                    <div>
                        Loading...
                    </div>
                    <button onClick={cancel}>Cancel</button>
                </>
            );
  }

  if (status === 'success') {
    return <div>Hi, {data.name}!</div>;
  }

  if (status === 'error') {
    return (
      <div>
        <p>Oops! Something went wrong.</p>
        <p>{error.message}</p>
        <button type="button" onClick={refetch}>
          Retry
        </button>
      </div>
    );
  }
}
```
```typescript
type options ={
attemptsNumber:number,
base: string
}
```

|option|value|
|---|---|
|`attemptsNumber`| by default `1` just a count os requests in case of failure | 
|`base`| by default `https://` with api they're forms request url `base + api`  | 


