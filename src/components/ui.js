import { useState, useEffect, useContext } from 'preact/hooks';

const Flash = (({ pubsub }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('')

  const events = useContext(pubsub);

  useEffect(() => {
    events.on('*', (evt, data) => {
      setVisible(true);
      setMessage(data.message);
      setCategory(data.category);
      setTimeout(() => {
        setVisible(false);
      }, 4000);
    });  
  }, [events])

  return (
    visible && <div class={`toast toast-${category}`}>
      <button class="btn btn-clear float-right" onClick={() => setVisible(false)} />
      <p>{message}</p>
    </div>
  )
});

export { Flash };
