import { useState } from 'react';
import './App.css';
import Header from './Header';

interface IName {
  value: string;
  id: number;
}

const updateItem = (item_list: IName[], itemToUpdate: IName) => {
  const item = item_list.find((item: IName) => item?.id === itemToUpdate?.id);
  if (item) {
    item_list[item_list.indexOf(item)] = itemToUpdate;
  }
  return item_list;
};

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [names, setNames] = useState<IName[]>([]);
  const [edit, setEdit] = useState<number>(0);

  const handleKeyPress = (event: any) => {
    // Enter key is used to deactivate the edit on an input assuming the save functionality
    if (event.key === 'Enter') {
      setEdit(0);
    }
    return;
  };

  const handleEditAndSaveButton = (name: IName) => {
    // if input is active, deactivate
    if (edit === name.id) {
      setEdit(0);
    } else {
      // activate
      setEdit(name.id);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (text) {
      const splitNames = text.split(',');

      // remove empty string and space from splitNames
      if (splitNames.includes('')) {
        const index = splitNames.indexOf('');
        splitNames.splice(index, 1);
      }

      if (splitNames.includes(' ')) {
        const index = splitNames.indexOf('');
        splitNames.splice(index, 1);
      }

      // create IName objects
      const INameObjects = splitNames.map((name: string, index: number) => {
        return {
          value: name,
          id: index + Date.now(),
        };
      });

      // update state with INameObjects
      setNames((prevNames) => [...prevNames, ...INameObjects]);

      // reset the text state to an empty string
      setText('');
    }
    return;
  };

  const handleEdit = (event: any, nameToUpdate: IName) => {
    // get the item to be edited
    const item = names.find((name: IName) => name?.id === nameToUpdate?.id);
    // if item exists update the index
    if (item) {
      names[names.indexOf(item)] = nameToUpdate;
    }

    // update the array
    const newNames = updateItem(names, {
      ...nameToUpdate,
      value: event.target.value,
    });
    // update the state to hold the new name
    setNames((prevWords) => newNames);
  };

  const handleDelete = (itemToDelete: IName) => {
    // filter out the item to be deleted
    const items = names.filter((name: IName) => name?.id !== itemToDelete?.id);
    // update state to remove the deleted item
    setNames((prevWords) => items);
  };

  return (
    <div className='App'>
      <header className='App_header'>
        <Header />
      </header>

      <main className='App_main'>
        <form onSubmit={handleSubmit} className='App_form'>
          <input
            type='text'
            name='input_stream'
            id='input_stream'
            placeholder='Enter names separated by commas'
            // set the value of text on input onChange event
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setText(value)
            }
            value={text}
            className='input_stream'
          />
          <button
            className='App_button tool_tip'
            type='submit'
            disabled={!text} // disable submit button if no text
          >
            Submit{' '}
            {!text ? <span className='tool_tip_text'>Enter names</span> : null}
          </button>
        </form>
        {names.length ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {names.map((name: IName) => (
                <tr key={name.id + Date.now()}>
                  <td>
                    <input
                      className='App_input'
                      defaultValue={name.value}
                      type='text'
                      onKeyUpCapture={(event) => handleKeyPress(event)}
                      name={name.value}
                      disabled={edit !== name.id} // disable input if not selected to be edited
                      onChange={(event: any) => handleEdit(event, name)}
                    />
                  </td>
                  <td>
                    <button
                      className='App_button'
                      onClick={() => handleEditAndSaveButton(name)}
                    >
                      {edit !== name.id ? 'Edit' : 'Save'}
                    </button>
                  </td>
                  <td>
                    <button
                      className='App_button'
                      onClick={() => handleDelete(name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </main>
    </div>
  );
};

export default App;
