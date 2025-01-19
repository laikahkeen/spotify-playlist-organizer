import spotifyAccountApi from '@/api/spotifyAccountApi';
import spotifyApi from '@/api/spotifyApi';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/interfaces/spotify';

function populateUI(profile: UserProfile) {
  document.getElementById('displayName')!.innerText = profile.display_name;
  if (profile.images[0]) {
    const profileImage = new Image(200, 200);
    profileImage.src = profile.images[0].url;
    document.getElementById('avatar')!.appendChild(profileImage);
  }
  document.getElementById('id')!.innerText = profile.id;
  document.getElementById('email')!.innerText = profile.email;
  document.getElementById('uri')!.innerText = profile.uri;
  document.getElementById('uri')!.setAttribute('href', profile.external_urls.spotify);
  document.getElementById('url')!.innerText = profile.href;
  document.getElementById('url')!.setAttribute('href', profile.href);
  document.getElementById('imgUrl')!.innerText = profile.images[0]?.url ?? '(no profile image)';
}

export default function ProfileData() {
  const { data: profile, isError } = spotifyApi.useGetProfile();
  async function handleFetchProfile() {
    if (profile) {
      populateUI(profile);
    } else {
      spotifyAccountApi.redirectToAuthCodeFlow();
    }
  }

  return (
    <div>
      <h1>Display your Spotify profile data</h1>
      {isError && <h1>generate token first</h1>}
      <Button onClick={handleFetchProfile}>handle fetch profile</Button>
      <section id="profile">
        <h2>
          Logged in as <span id="displayName"></span>
        </h2>
        <span id="avatar"></span>
        <ul>
          <li>
            User ID: <span id="id"></span>
          </li>
          <li>
            Email: <span id="email"></span>
          </li>
          <li>
            Spotify URI: <a id="uri" href="#"></a>
          </li>
          <li>
            Link: <a id="url" href="#"></a>
          </li>
          <li>
            Profile Image: <span id="imgUrl"></span>
          </li>
        </ul>
      </section>
    </div>
  );
}
