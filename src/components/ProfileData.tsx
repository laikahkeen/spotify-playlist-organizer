import { fetchProfile, redirectToAuthCodeFlow, UserProfile } from '../api';
import { useAuthStore } from '../zustand/authStore';

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
  const clientId = 'ea805dc29a43402580309e9b53e180b4';
  const accessToken = useAuthStore((state) => state.accessToken);
  async function handleFetchProfile() {
    if (!accessToken) {
      redirectToAuthCodeFlow(clientId);
    } else {
      const profile = await fetchProfile(accessToken);
      populateUI(profile);
    }
  }

  return (
    <div>
      <h1>Display your Spotify profile data</h1>
      <p>access token: {accessToken}</p>
      <button className="btn" onClick={handleFetchProfile}>
        handle fetch profile
      </button>
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
