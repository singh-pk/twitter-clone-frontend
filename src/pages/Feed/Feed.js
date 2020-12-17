import './Feed.scss';

import Header from '../../components/header/Header';
import Tweet from '../../components/tweet/Tweet';
import Posts from '../../components/posts/Posts';

import './Feed.scss';

const Feed = () => (
  <div className='feed'>
    <Header>
      <h3>Home</h3>
    </Header>
    <Tweet />
    <Posts />
  </div>
);

export default Feed;
