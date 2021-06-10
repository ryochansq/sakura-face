import { VFC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    tweet: {
      color: 'white',
      fontWeight: 700,
      textTransform: 'none',
    },
  })
);

type Props = {
  students: Student[];
};

const TweetButton: VFC<Props> = ({ students }: Props) => {
  const classes = useStyles();

  const tweet = () => {
    const subText = students.reduce(
      (acc, student) =>
        `${acc}${student.name} ... そっくり度 ${(
          student.confidence * 100
        ).toFixed(1)}%\n`,
      ''
    );
    const text = `さくら学院そっくりさんで判定しました！\n\n${subText}\nryochansq.github.io/sakura-face/\n\n#さくら学院そっくりさん\n#さくら学院 #さくら学院父兄パソコン部`;
    const encodedText = encodeURIComponent(text);
    const intent = `https://twitter.com/intent/tweet?text=${encodedText}`;
    window.open(intent);
  };

  return (
    <Button
      className={classes.tweet}
      variant="contained"
      color="secondary"
      onClick={tweet}
    >
      Twitterで共有
    </Button>
  );
};

export default TweetButton;
