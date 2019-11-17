import styled from 'styled-components/native';

export const Post = styled.TouchableOpacity`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  align-items: flex-start;
  margin-left: 15px;
  width: 90%;
  border-radius: 10px;
  background-color: rgba(255,255,255, .8);
  box-shadow: 10px 5px 5px #000;
`;

export const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: flex-start;
  border-right-width: 1px ;
  border-color: #d3d3d3;
  width: 35%;
`;

export const Avatar = styled.Image`
  width: 75px;
  height: 75px;
  margin-right: 10px;
`;

export const Name = styled.Text`
  color: #333;
  font-weight: bold;
`;

// export const PostImage = styled.Image`
//   width: 100%;
//   aspect-ratio:${props => props.ratio};
// `;

export const Description = styled.Text`
  padding: 15px;
  line-height: 18px;
  width: 65%;
  text-align: center;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#999',
})`
  margin: 30px 0;
`;