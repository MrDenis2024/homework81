import LinkForm from '../../components/Form/LinkForm';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {createLink} from '../../store/linksThunks';
import {NewLink} from '../../types';
import {selectorCreateLoading, selectorShortenLink} from '../../store/linksSlice';
import {toast} from 'react-toastify';

const Home = () => {
  const dispatch = useAppDispatch();
  const shortenLink = useAppSelector(selectorShortenLink);
  const createLoading = useAppSelector(selectorCreateLoading);

  const onFormSubmit = async (link: NewLink) => {
    try {
      await dispatch(createLink(link)).unwrap();
    } catch (e) {
      toast.error('Произошла ошибка содания ссылки');
    }
  };

  return (
    <>
      <div className='mt-5 text-center'>
        <LinkForm onSubmit={onFormSubmit} createLoading={createLoading}/>
      </div>
      {shortenLink && (
        <div className='text-center mt-5'>
          <h4><strong>Your link now looks like this:</strong></h4>
          <a href={`http://localhost:8000/${shortenLink.shortUrl}`} target="_blank">http://localhost:8000/{shortenLink.shortUrl}</a>
        </div>
      )}
    </>
  );
};

export default Home;