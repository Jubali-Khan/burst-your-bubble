import CommentInput from './CommentInput';
import OpinionComment from './OpinionComment';

export default function CommentSection(props) {
  return (
    <div>
      CommentSection:
      {/* CommentSection:
      1. looping over the opinion comments
      2. showing commentInput */}
      <ul>
        <li>
          <OpinionComment />
        </li>
        <li>
          <CommentInput />
        </li>
      </ul>
    </div>
  );
}
