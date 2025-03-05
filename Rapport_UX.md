Un rapport d'UX complet détaillant les problèmes identifiés, les solutions proposées et les améliorations mises en place.

## Domaines d'amélioration

### 1. Problèmes d'authentification
**Gravité : élevée**
- L'enregistrement 001 a montré des problèmes d'accès critiques
- L'utilisateur n'a pas pu se connecter malgré plusieurs tentatives
- Aucun message d'erreur clair pour guider l'utilisateur

**Solution proposée**
- Afficher un message lui indiquant qu'aucun utilisateur n'est connu avec cet identifiant et/ou mot de passe et l'encourageant à s'enregistrer
```
const handleSubmit = useCallback(async (e) => {
e.preventDefault();
setAuthLoading(true);
setError('');

isLogin
    ? await login(username, password)
    .catch(() => setError('Login failed. Aucun utilisateur n'est connu avec cet identifiant et/ou ce mot de passe. Pensez à vous enregistrer si vous ne possédez pas de compte'))
    : await register(username, password)
    .catch(() => setError('Registration failed'));

setAuthLoading(false);

}, [isLogin, username, password, login, register, setAuthLoading]);
```
___

### 2. Flux de création de transaction
**Gravité : élevée**
- L'enregistrement 003 a mis en évidence un problème critique d'expérience utilisateur
- Les utilisateurs perdent les données du formulaire lorsqu'ils passent d'une section à l'autre
- Les dépendances (catégories/méthodes de paiement) ne sont pas clairement communiquées

 
**Solution proposée**

TODO:
En cas de Transaction commencée, sans mode de paiement proposé:   
- Sauvegarder les données de la transaction en cours
- Rediriger vers la section "Payment method" pour enregistrer un mode de paiement
- Retourner sur la section "Transaction" avec les données et le mode de paiement afin de "Create Transaction"

ou plus simple :
- Rajouter un message sur la page "Transaction" précisant : " Un mode de paiement doit obligatoirement être enregistrer pour commencer un transaction".
___

### 3. Problèmes de découvrabilité
**Gravité : moyenne**
- L'enregistrement 004 a montré une mauvaise découverte des fonctionnalités de base
- Le bouton FAB (+) n'est pas immédiatement perceptible
- L'objectif des différentes sections n'est pas clair pour les nouveaux utilisateurs


**Solution proposée**

- Gérer le côté responsive : pour la version mobile, faire apparaitre le bouton (+)
- Mieux positioner le bouton (+) pour qu'il soit plus visible sur la page (version ordinateur)
```
.fab-button {
  position: absolute;
  ...
}
@media (max-width: 768px) {
  .fab-button {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 51px;
    height: 51px;
  }
}

@media (max-width: 480px) {
  .fab-button {
    bottom: 1rem;
    right: 1rem;
    width: 46px;
    height: 46px;
  }
}
```

___

### 4. Réactivité mobile
**Gravité : moyenne**
- L'enregistrement 005 a révélé des problèmes de mise en page sur les petits écrans
- Le débordement de contenu rend la navigation difficile
- Les cibles tactiles sont peut-être trop petites

**Solution proposée**
- Gérer le côté responsive et la taille des composants

Positionnement des boutons --> centrés + espacement(margin-top: 10px;):
```
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
}
```
```
.login-container button {
  margin-top: 10px;
  padding: 10px;
  background: #00438F;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```
Amélioration de la visibilité des actions avec un hover sur les boutons:
```
.login-container button:hover {
  border: 2px solid black;
}
```

Responsivité de la page de login : 
```
@media (max-width: 768px) {
  .login-container {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 10px;
    max-width: 80%;
  }
}
```

Ajustement du côté responsive de la navbar. Exemple: 
```
@media (max-width: 480px) {
  .navbar, .nav-brand {
    font-size: 0.8rem;
    gap: 5px;
  }

  .nav-links {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0rem;
    margin: 0;
  }
}
```

Ajustement du côté responsive d'une transaction dans Modal.css :
```
@media (max-width: 480px) {
  .modal-content {
    min-width: 50px;
    max-width: 300px;
    width: 90%;
  }

  h3,
  .modal-body input,
  .modal-body select,
  .modal-body textarea,
  .modal-body button {
    font-size: 0.8rem;
  }
}
```

Ajustement du côté responsive d'une mode de paiement :
```
.categories,
.payment-methods {
gap: 0.3rem;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Ajuster pour les écrans plus petits */
}
```

___

### 5. Problèmes de session
**Gravité : élevée**
- L'utilisateur a été forcé pour se connecter à chaque session
- Pas de bouton « Rester connecté » fourni par l'application


**Solution proposée**

TODO:
- gérer l'authenfication avec un useAuth
___

### Autres améliorations
**Ajout d'aria-label**

Pour expliciter les div. Exemple :
````
return (
<nav className="navbar">
    <div aria-label='nav-brand' className="nav-brand">Finance Tracker</div>
    <div aria-label='nav links' className="nav-links">
    <Link to="/" className={isActive('/')}>Transactions</Link>
    <Link to="/categories" className={isActive('/categories')}>Categories</Link>
    <Link to="/payment-methods" className={isActive('/payment-methods')}>Payment Methods</Link>
    </div>
    <div aria-label='button-logout' onClick={logout}>Logout</div>
</nav>
);

<div aria-label='login-container' className="login-container">


return (
    <div aria-label='category-list' className="category-list">
      <h2>Categories</h2>
      <button className="fab-button" onClick={() => setShowNewForm(true)}>+</button>
      
    <div aria-label='categories' className="categories">
        {categories.map(category => (
            <div key={category.id} className="category-item" style={{ backgroundColor: category.color }}>
            <div aria-label='category-content' className="category-content">
              <div aria-label='category-name' className="category-name">{category.name}</div>
              {category.limit && <div className="category-limit">Limit: ${category.limit}</div>}
            </div>
            ...
        )
        )
    }
)
````

## Indicateurs de réussite

| Fonctionnalité | Taux de réussite | Temps moyen de réalisation |
|---------|-------------|-------------------------|
| Connexion | 40 % | 45 secondes |
| Créer une transaction | 60 % | 2 minutes |
| Créer une catégorie | 100 % | 30 secondes |
| Créer un mode de paiement | 100 % | 45 secondes |

## Conclusions

L'application Finance Tracker est prometteuse avec son interface épurée et ses fonctionnalités bien pensées. Cependant, plusieurs problèmes critiques doivent être résolus :

1. **Priorité critique :**
- Améliorations du flux d'authentification
- Persistance des données de formulaire
- Communication des prérequis

2. **Priorité élevée :**
- Réactivité mobile
- Clarté de la navigation
- Première expérience utilisateur

3. **Priorité moyenne :**
- États vides
- Implémentation du tutoriel
- Optimisation de la cible tactile
