import React, {useState} from 'react';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {NewLink} from '../../types';

interface Props {
  onSubmit: (link: NewLink) => void;
  createLoading: boolean;
}

const LinkForm: React.FC<Props> = ({onSubmit, createLoading}) => {
  const [link, setLink] = useState<NewLink>({
    url: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setLink((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...link});
    setLink({
      url: '',
    });
  };

  return (
    <form className='mt-5' onSubmit={submitFormHandler}>
      <div className="d-flex flex-column form-group mb-3 d-flex align-items-center">
        <label htmlFor="url" className='fs-1 mb-4'><strong>Shorten your link!</strong></label>
        <input type="url" name="url" id="url" className="form-control" placeholder="Enter URL here"
               onChange={inputChangeHandler}
               value={link.url} required/>
      </div>
      <div>
        <button type='submit' className='btn btn-success'  disabled={createLoading}> {createLoading &&
          <ButtonSpinner/>}Shorten!</button>
      </div>
    </form>
  );
};

export default LinkForm;